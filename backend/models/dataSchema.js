const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  by: { type: String, required: true },
  title: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  time: { type: Number },
  url: { type: String },
  hackerNewsUrl: { type: String, default: 'https://news.ycombinator.com/' },
  comments: { type: Number, default: 0 }
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;