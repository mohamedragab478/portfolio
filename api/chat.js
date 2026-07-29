import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { connectDb } from './_utils/mongodb.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Settings from './models/Settings.js';
import Certificate from './models/Certificate.js';
import { setCors, handlePreflight } from './_middleware.js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

const SYSTEM_PROMPT = `
You are the official AI Assistant for Amir Elrefai (also known as Amir Elfalw), an elite AI & Machine Learning Engineer specializing in Deep Learning, Computer Vision, AI Agents, and Generative AI.

Your primary mission is to interact with recruiters, software engineers, and hiring managers visiting Amir's interactive portfolio.
- Be articulate, highly technical yet approachable, professional, and concise.
- Use your tools ('getProjects', 'getSkills', 'getProfileSettings', 'getCertificates') to dynamically fetch up-to-date information directly from the database whenever relevant questions are asked.
- Highlight Amir's expertise in PyTorch, TensorFlow, OpenCV, LangChain, YOLO, RAG architectures, and Edge AI deployment.
`;

export default async function handler(req, res) {
  setCors(res);
  if (handlePreflight(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages)) {
      return res.status(400).json({ success: false, error: 'Invalid or missing messages array' });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GIMINI_API_KEY;

    if (apiKey && apiKey.startsWith('AIzaSy')) {
      const google = createGoogleGenerativeAI({ apiKey });
      const result = streamText({
        model: google('gemini-1.5-flash'),
        system: SYSTEM_PROMPT,
        messages,
        maxSteps: 5,
        tools: {
          getProjects: tool({
            description: 'Fetch projects from Amir\'s portfolio, optionally filtered by domain category (nlp, cv, dl, ds, agents, gen_ai).',
            parameters: z.object({
              category: z.string().optional().describe('Domain category filter (e.g., cv, nlp, agents, gen_ai)'),
            }),
            execute: async ({ category }) => {
              await connectDb();
              const query = category ? { category: category.toLowerCase() } : {};
              const projects = await Project.find(query).lean();
              return projects.map(({ _id, __v, ...rest }) => ({ id: _id.toString(), ...rest }));
            },
          }),

          getSkills: tool({
            description: 'Fetch technical skills from Amir\'s arsenal, optionally filtered by category (deep_learning, computer_vision, data_science, nlp_ai, development, devops).',
            parameters: z.object({
              category: z.string().optional().describe('Skill category filter'),
            }),
            execute: async ({ category }) => {
              await connectDb();
              const query = category ? { category: category.toLowerCase() } : {};
              const skills = await Skill.find(query).sort({ importance: -1 }).lean();
              return skills.map(({ _id, __v, ...rest }) => ({ id: _id.toString(), ...rest }));
            },
          }),

          getProfileSettings: tool({
            description: 'Fetch Amir\'s global profile settings including full name, job title, bio, CV/resume link, and social profile URLs.',
            parameters: z.object({}),
            execute: async () => {
              await connectDb();
              const settings = await Settings.findOne({}).lean();
              if (!settings) {
                return {
                  fullName: 'Amir Elrefai',
                  jobTitle: 'AI Engineering',
                  bio: 'Passionate AI Engineer specializing in Deep Learning, Computer Vision, and Generative AI.',
                  resumeUrl: 'https://drive.google.com/file/d/1vdfjkWTQ_1l7Jugs-vbgyxbe_0DTe4pk/view?usp=sharing',
                  socialLinks: { github: 'https://github.com/amerelfalwo' },
                };
              }
              const { _id, __v, ...rest } = settings;
              return { id: _id.toString(), ...rest };
            },
          }),

          getCertificates: tool({
            description: 'Fetch verified academic credentials, professional certifications, and training achievements for Amir.',
            parameters: z.object({}),
            execute: async () => {
              await connectDb();
              const certs = await Certificate.find({}).sort({ date: -1 }).lean();
              return certs.map(({ _id, __v, ...rest }) => ({ id: _id.toString(), ...rest }));
            },
          }),
        },
      });

      return result.toDataStreamResponse(res);
    }

    // Direct AI Portfolio Assistant Stream Protocol (Strict Vercel AI Format: 0:"text")
    const lastUserMessage = messages.filter((m) => m.role === 'user').pop()?.content || '';

    const fallbackText = `I am Amir's AI Portfolio Assistant! ⚡

Regarding your question: "${lastUserMessage || 'Amir\'s Background'}"

Amir Elrefai is an AI & Machine Learning Engineer specializing in Deep Learning, Computer Vision, and AI Agent Architecture.
- **Core Technologies**: PyTorch, TensorFlow, OpenCV, Python, C++, Docker, FastAPI, YOLO v11, LangChain
- **Portfolio**: You can explore core projects, skills, and verified credentials across the portfolio.

Feel free to click the **Connect** button at the top to reach Amir directly!`;

    res.setHeader('Content-Type', 'text/x-unknown');
    res.setHeader('x-vercel-ai-ui-stream', 'v1');
    return res.status(200).send(`0:${JSON.stringify(fallbackText)}\n`);
  } catch (error) {
    console.error('API Error (/api/chat):', error);

    const errorMsg = "I am Amir's AI Portfolio Assistant! Feel free to ask about Amir's AI projects, technical skills, or credentials.";
    res.setHeader('Content-Type', 'text/x-unknown');
    res.setHeader('x-vercel-ai-ui-stream', 'v1');
    return res.status(200).send(`0:${JSON.stringify(errorMsg)}\n`);
  }
}
