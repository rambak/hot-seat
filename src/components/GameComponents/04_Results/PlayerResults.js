import React from 'react';

export const PlayerResults = () => {
  return (
    <div
      style={{
        width: '100%',
        height: 0,
        paddingBottom: ' 80%',
        position: 'relative',
      }}
    >
      <iframe
        src="https://giphy.com/embed/5VKbvrjxpVJCM"
        width="100%"
        height="100%"
        style={{ position: 'absolute' }}
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
        title="results-gif"
      />
    </div>
  );
};

export default PlayerResults;
