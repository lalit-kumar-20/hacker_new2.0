const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const Story = require('./models/dataSchema');
const authRoutes = require('./routes/AuthRoutes');
const fetchRoutes = require('./routes/FetchRoutes');


// Connect DB
const db = require('./db');

// app Use
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Welcome');
});

const BASE_API_URL = 'https://hacker-news.firebaseio.com/v0';
let data = [];

const getStory = async (id) => {
    try {
        const story = await axios.get(`${BASE_API_URL}/item/${id}.json`);
        return story;
    } catch (error) {
        console.log('Error while getting a story.');
    }
};

const getStories = async (type) => {
    try {
        const { data: storyIds } = await axios.get(`${BASE_API_URL}/${type}stories.json`);
        const limitedStoryIds = storyIds.slice(0, 90);
        
        const stories = await Promise.all(limitedStoryIds.map(getStory));
        data = stories.map(story => {
            // Extract only the fields defined in the dataSchema
            const { id, by, title,time, url } = story.data;
          //  console.log(story.data);
            return { id, by, title,time, url };
        });

        // Process the stories and update the database
        await processStoriesAndUpdateDatabase();
    } catch (error) {
        console.log('Error while getting list of stories.');
    }
};

const processStoriesAndUpdateDatabase = async () => {
    try {
        for (const storyData of data) {
          console.log(storyData)
            // Find the story in the database by its ID
            const existingStory = await Story.findOne({ id: storyData.id });

            if (existingStory) {
              // If the story exists, update its fields
              await Story.updateOne(
                  { id: storyData.id },
                  { $set: { upvotes: existingStory.upvotes + 1, comments: existingStory.comments + 1 } }
              );
          } else {
              // If the story doesn't exist, create a new document in the database
              await Story.create(storyData);
          }
        }

        console.log('Stories processed and database updated successfully.');
    } catch (error) {
        console.error('Error while processing stories and updating database:', error);
    }
};

getStories('new');

app.use('/api/auth', authRoutes);
app.use('/api', fetchRoutes);

app.listen(port, () => {
    console.log('listening on port ' + port);
});
