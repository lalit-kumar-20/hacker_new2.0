const { Request, Response } =require('express');
const Story =require('../models/dataSchema')



const fetchData = async (req, res) => {
  try {
      // Fetch stories sorted by time field in ascending order
      const stories = await Story.find().sort({ time: -1 });

      // Respond with the sorted data
      res.json(stories);
      console.log(stories);
  } catch (error) {
      console.error('Error fetching stories:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}








module.exports =  {fetchData} ;