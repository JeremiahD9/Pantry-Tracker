import { NextResponse } from 'next/server';
import * as dotenv from 'dotenv'
dotenv.config();

import {OpenAI} from "openai";
import fs from "fs";

const openai = new OpenAI();
// const base64Image = fs.readFileSync("", {encoding: "base64"});

export async function POST(request) {
  const { imageUrl } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
          {
              role: "user",
              content: [
                  {
                      type: "text",
                      text: "Can you tell me what the object is in this image? Only the name of the object should be included in the response. If you don't know the object, return 3 question marks.",
                  },
                  {
                      type: "image_url",
                      image_url: {
                          url: imageUrl,
                          detail: "low",
                      }
                  }
              ],
          },
      ],
      max_tokens: 250,
  });

    const content = response.choices[0].message.content;
    console.log(content)

    return NextResponse.json({ content });
}

// decipherImage();

