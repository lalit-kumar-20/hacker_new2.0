import React from 'react';

const Link = ({ url, title }) => (
  <a href={url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
    {title}
  </a>
);

const Story = ({ element: { id, by, title, kids, time, url , comments, upvotes} }) => {
  return (
    <div className="story flex flex-col justify-center items-center bg-gray-100 rounded-lg p-6 mb-6">
      <div className="story-title mb-4">
        <Link url={url} title={title} className="text-2xl md:text-lg lg:text-2xl text-center font-bold" />
      </div>
      <div className="story-info text-gray-700 text-sm">
        <span>
          by{' '}
          <Link url={`https://news.ycombinator.com/user?id=${by}`} title={by} />
        </span> | 
        <span>
          {" "+ new Date(time * 1000).toLocaleDateString('en-US', {
            hour: 'numeric',
            minute: 'numeric'
          })}
        </span> | 
        <span>
          <Link
            url={`https://news.ycombinator.com/item?id=${id}`}
            title={`${" "+ comments + " "} comments`}
          />
        </span> |
        <span>
          <Link
            url={`https://news.ycombinator.com/item?id=${id}`}
            title={`${" "+upvotes+ " "}Upvotes`}
          />
        </span>
      </div>
    </div>
  );
};

export default Story;
