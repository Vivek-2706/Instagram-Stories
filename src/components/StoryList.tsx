import React from 'react';

type Story = {
  id: string;
  imageUrl: string;
};

type StoryListProps = {
  stories: Story[];
  onStorySelect: (index: number) => void;
  viewedStories: string[];
};

const StoryList: React.FC<StoryListProps> = ({
  stories,
  onStorySelect,
  viewedStories,
}) => {
  return (
    <div style={inlineStyles.container}>
      {stories.map((story, index) => (
        <button
          key={story.id}
          style={inlineStyles.thumbnailButton}
          onClick={() => onStorySelect(index)}
        >
          <img
            data-testid="thumbnail"
            src={story.imageUrl}
            alt={`Story thumbnail ${index + 1}`}
            style={{
              ...inlineStyles.thumbnailImage,
              opacity: viewedStories.includes(story.id) ? 0.4 : 1,
            }}
          />
        </button>
      ))}
    </div>
  );
};

const inlineStyles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    overflowX: 'auto',
    gap: '8px',
    padding: '12px',
    scrollbarWidth: 'none', 
  },
  thumbnailButton: {
    border: 'none',
    background: 'none',
    padding: 0,
    cursor: 'pointer',
  },
  thumbnailImage: {
    width: '64px',
    height: '64px',
    objectFit: 'cover',
    borderRadius: '50%',
    border: '2px solid #f00',
  },
};

export default StoryList;
