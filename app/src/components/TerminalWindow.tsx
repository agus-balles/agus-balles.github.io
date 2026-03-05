import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { useIsMobile } from '../hooks/use-mobile';

type RenderContent = ReactNode | ((closeExpanded: () => void) => ReactNode);

interface TerminalWindowProps {
  title: ReactNode;
  children: RenderContent;
  className?: string;
  style?: CSSProperties;
  contentClassName?: string;
  expandedContent?: RenderContent;
  expandedContainerClassName?: string;
  expandable?: boolean;
}

const renderContent = (content: RenderContent, closeExpanded: () => void) => {
  if (typeof content === 'function') {
    return content(closeExpanded);
  }

  return content;
};

const TerminalWindow = ({
  title,
  children,
  className = '',
  style,
  contentClassName = '',
  expandedContent,
  expandedContainerClassName = '',
  expandable = true,
}: TerminalWindowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const isMobile = useIsMobile();

  const closeExpanded = () => setIsExpanded(false);
  const openExpanded = () => {
    if (!expandable) return;
    setIsExpanded(true);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeExpanded();
      }
    };

    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.addEventListener('keydown', handleEscape);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscrollBehavior;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isExpanded]);

  const expandedWindow = isExpanded && portalTarget
    ? createPortal(
      <div
        className={`fixed left-0 right-0 bottom-0 flex overflow-hidden overscroll-none p-2 sm:p-6 ${isMobile ? 'top-16 z-40 items-start justify-center' : 'top-0 z-[120] items-center justify-center'}`}
        style={
          {
            '--expanded-pad-top': 'calc(env(safe-area-inset-top) + clamp(0.75rem, 3dvh, 1.5rem))',
            '--expanded-pad-bottom': 'calc(env(safe-area-inset-bottom) + clamp(0.75rem, 3dvh, 1.5rem))',
            '--expanded-header-height': '2.5625rem',
            paddingTop: isMobile
              ? 'clamp(0.5rem, 2dvh, 0.75rem)'
              : 'var(--expanded-pad-top)',
            paddingBottom: 'var(--expanded-pad-bottom)',
          } as CSSProperties
        }
      >
        <button
          type="button"
          aria-label="Close expanded window"
          className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
          onClick={closeExpanded}
        />

        <div
          className={`relative w-full max-w-4xl terminal-window card-lift overflow-hidden flex flex-col ${expandedContainerClassName}`}
          style={{
            maxHeight:
              isMobile
                ? 'calc(100dvh - 4rem - var(--expanded-pad-bottom) - clamp(0.5rem, 2dvh, 0.75rem))'
                : 'calc(100dvh - var(--expanded-pad-top) - var(--expanded-pad-bottom))',
          }}
        >
          <div className="terminal-header relative z-20 shrink-0 sticky top-0 min-w-0">
            <button
              type="button"
              aria-label="Close expanded window"
              className="terminal-dot red border-0 p-0 cursor-pointer shrink-0"
              onClick={closeExpanded}
            />
            <button
              type="button"
              aria-label="Minimize expanded window"
              className="terminal-dot yellow border-0 p-0 cursor-pointer shrink-0"
              onClick={closeExpanded}
            />
            <button
              type="button"
              aria-label="Expanded window"
              className="terminal-dot green border-0 p-0 shrink-0"
            />
            <span className="ml-2 min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap sm:overflow-visible sm:whitespace-normal sm:text-clip font-mono text-xs text-muted-foreground flex items-center gap-2">
              {title}
            </span>
          </div>

          <div
            className={`${contentClassName} min-h-0 min-w-0 overflow-y-auto overscroll-contain`}
            style={
              isMobile
                ? {
                  maxHeight:
                    'calc(100dvh - 4rem - var(--expanded-pad-bottom) - clamp(0.5rem, 2dvh, 0.75rem) - var(--expanded-header-height))',
                }
                : undefined
            }
          >
            {renderContent(expandedContent ?? children, closeExpanded)}
          </div>
        </div>
      </div>,
      portalTarget
    )
    : null;

  return (
    <>
      <div
        ref={cardRef}
        className={`terminal-window card-lift relative overflow-hidden group transition-all duration-300 hover:border-mint/60 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.35)] w-full min-w-0 ${className}`}
        style={style}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div
            className="terminal-hover-line absolute w-full h-0.5 bg-gradient-to-r from-transparent via-mint/60 to-transparent"
            style={{
              top: 'var(--mouse-y, 50%)',
              transform: 'translateY(-50%)',
            }}
          />
        </div>

        <div className="terminal-header min-w-0">
          <button
            type="button"
            aria-label="Close window"
            className="terminal-dot red border-0 p-0 cursor-pointer shrink-0"
            onClick={closeExpanded}
          />
          <button
            type="button"
            aria-label="Minimize window"
            className="terminal-dot yellow border-0 p-0 cursor-pointer shrink-0"
            onClick={closeExpanded}
          />
          <button
            type="button"
            aria-label="Expand window"
            className={`terminal-dot green border-0 p-0 shrink-0 ${expandable ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={openExpanded}
          />
          <span className="ml-2 min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap sm:overflow-visible sm:whitespace-normal sm:text-clip font-mono text-xs text-muted-foreground flex items-center gap-2">
            {title}
          </span>
        </div>

        <div className={`${contentClassName} min-w-0`}>
          {renderContent(children, closeExpanded)}
        </div>
      </div>

      {expandedWindow}
    </>
  );
};

export default TerminalWindow;
