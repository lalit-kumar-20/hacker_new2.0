const { Request, Response } =require('express');
const Story =require('../models/dataSchema')



const fetchData=async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
        console.log(stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}








module.exports =  {fetchData} ;