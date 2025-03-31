import React, { useEffect, useState } from 'react';

type Story = {
  id: string;
  imageUrl: string;
};

type StoryViewerProps = {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const story = stories[currentIndex];
  const [loading, setLoading] = useState(true);

  // close on esc
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // timer 5 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      const isLastStory = currentIndex >= stories.length - 1;
      console.log('Auto-advancing to:', stories[currentIndex + 1]?.id);
      isLastStory ? onClose() : onNavigate(currentIndex + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, stories.length, onNavigate, onClose]);

  // click left and right
  const handleTap = (e: React.MouseEvent) => {
    const isLeft = e.clientX < window.innerWidth / 2;

    if (isLeft && currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else if (!isLeft) {
      const isLast = currentIndex >= stories.length - 1;
      isLast ? onClose() : onNavigate(currentIndex + 1);
    }
  };

  return (
    <div style={viewerStyles.overlay} onClick={handleTap}>
      <div style={viewerStyles.imageWrapper}>
        <div style={viewerStyles.progressBarWrapper}>
          <div key={story.id} style={viewerStyles.progressBar} />
        </div>
        {loading && <p style={viewerStyles.loading}>Loading...</p>}
        <img
          src={story.imageUrl}
          alt={`Story ${story.id}`}
          onLoad={() => setLoading(false)}
          style={{
            ...viewerStyles.image,
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      </div>
    </div>
  );
};

const viewerStyles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  loading: {
    color: '#fff',
    fontSize: 20,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  progressBarWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 10,
  },
  progressBar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    animation: 'progressAnim 5s linear forwards',
  },
};

export default StoryViewer;
