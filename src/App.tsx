import { useState } from 'react';
import { stories } from './data/stories';
import StoryList from './components/StoryList';
import StoryViewer from './components/StoryViewer';

function App() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [viewedStories, setViewedStories] = useState<string[]>([]);

  // mark story as viewed
  const openStory = (index: number) => {
    const storyId = stories[index].id;

    setViewedStories((prev) =>
      prev.includes(storyId) ? prev : [...prev, storyId]
    );

    setSelectedIndex(index);
  };

  const closeViewer = () => setSelectedIndex(null);

  const goToStory = (index: number) => {
    const storyId = stories[index].id;
    console.log('Navigating to story:', storyId);

    setViewedStories((prev) =>
      prev.includes(storyId) ? prev : [...prev, storyId]
    );

    setSelectedIndex(index);
  };

  return (
    <div>
      <h2 style={{ padding: '12px' }}>Stories</h2>

      <StoryList
        stories={stories}
        onStorySelect={openStory}
        viewedStories={viewedStories}
      />

      {selectedIndex !== null && (
        <StoryViewer
          stories={stories}
          currentIndex={selectedIndex}
          onClose={closeViewer}
          onNavigate={goToStory}
        />
      )}
    </div>
  );
}

export default App;
