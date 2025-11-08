# ChatBox AI Integration Guide

## Overview

The ChatBox component has been successfully integrated into your Emergency Response app! It appears as a beautiful floating button in the bottom-right corner **for Citizens only** (not volunteers).

## Current Status

✅ **Completed:**
- Beautiful glassmorphism chatbox UI with your Catppuccin color scheme
- Floating button with pulse animation
- Smooth Motion animations for open/close
- Multi-language support (all 5 languages: English, Spanish, Hindi, Kannada, Malayalam)
- Typing indicator animation
- Quick suggestion buttons
- Message history
- Responsive design (mobile & desktop)
- Mock AI responses with keyword matching

## What You Need to Do

To make the ChatBox work with **real AI**, you have two main options:

### Option 1: OpenAI Integration (Recommended)

#### Step 1: Get OpenAI API Key
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-...`)

#### Step 2: Store API Key Securely
**IMPORTANT:** Never expose API keys in frontend code!

**Option A: Use Supabase Edge Functions (Recommended)**
```typescript
// In Supabase Dashboard, create an Edge Function:
// supabase/functions/chat/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { message, conversationHistory } = await req.json()
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an emergency response assistant. Help users understand how to:
- Report emergencies quickly
- Use offline features
- Understand privacy settings
- Track their reports
- Add photos and location
Be concise, helpful, and empathetic.`
        },
        ...conversationHistory,
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })
  })
  
  const data = await response.json()
  
  return new Response(
    JSON.stringify({ reply: data.choices[0].message.content }),
    { headers: { "Content-Type": "application/json" } }
  )
})
```

**Option B: Use Backend Server**
Create a backend endpoint that keeps the API key secure.

#### Step 3: Update ChatBox Component

Replace the `generateAIResponse` function in `/components/ChatBox.tsx`:

```typescript
const generateAIResponse = async (userInput: string): Promise<string> => {
  try {
    // Build conversation history for context
    const conversationHistory = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    // Call your Supabase Edge Function
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/chat`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          message: userInput,
          conversationHistory
        })
      }
    );

    const data = await response.json();
    return data.reply;
    
  } catch (error) {
    console.error('AI Error:', error);
    return "I'm having trouble connecting right now. Please try again or use the quick suggestions above.";
  }
};
```

#### Step 4: Update the handleSendMessage function

Change it to be async:

```typescript
const handleSendMessage = async () => {
  if (!inputValue.trim()) return;

  // Add user message
  const userMessage: Message = {
    id: `user-${Date.now()}`,
    text: inputValue,
    sender: "user",
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  const currentInput = inputValue;
  setInputValue("");
  setIsTyping(true);

  try {
    // Get AI response
    const aiResponse = await generateAIResponse(currentInput);
    
    const aiMessage: Message = {
      id: `ai-${Date.now()}`,
      text: aiResponse,
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (error) {
    toast.error("Failed to get AI response. Please try again.");
  } finally {
    setIsTyping(false);
  }
};
```

### Option 2: Anthropic Claude Integration

Similar to OpenAI but uses Claude API:

```typescript
// In Supabase Edge Function
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': Deno.env.get('ANTHROPIC_API_KEY'),
    'anthropic-version': '2023-06-01',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-3-haiku-20240307',
    max_tokens: 500,
    messages: conversationHistory
  })
})
```

### Option 3: Local AI Model (Offline-First)

For offline-first approach, use:
- **Ollama** with small models
- **Transformers.js** in browser
- **WebLLM** for in-browser inference

This is more complex but provides true offline support.

## Environment Variables Needed

Add to your `.env.local`:

```bash
# For OpenAI
VITE_OPENAI_API_KEY=sk-your-key-here  # DON'T use in production frontend!

# For Supabase Edge Functions
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# In Supabase Dashboard -> Settings -> Edge Functions Secrets
OPENAI_API_KEY=sk-your-actual-key
```

## Testing the Integration

1. **Test the UI First:**
   - Log in as a Citizen (not volunteer)
   - You should see the purple chat button in bottom-right
   - Click it to open the chat
   - Try the quick suggestions
   - Send a message and see the mock response

2. **Test with Real AI:**
   - After implementing one of the options above
   - Ask: "How do I report an emergency?"
   - Check if you get a relevant AI response
   - Test error handling by disconnecting internet

## Customization Tips

### Change Chat Button Position
In `/components/ChatBox.tsx`, line with `fixed bottom-6 right-6`:
```typescript
className="fixed bottom-6 left-6 z-50"  // Move to left
className="fixed top-6 right-6 z-50"    // Move to top
```

### Change Colors
Replace purple/indigo gradients:
```typescript
// Current: Purple/Indigo
from-purple-600 to-indigo-700

// Options:
from-blue-600 to-cyan-700      // Blue
from-green-600 to-emerald-700  // Green
from-red-600 to-pink-700       // Red
```

### Adjust Chat Window Size
In the chat window motion.div:
```typescript
className="... w-[380px] h-[600px] ..."

// Make it bigger:
className="... w-[450px] h-[700px] ..."
```

### Add Voice Input
Install speech recognition:
```bash
npm install react-speech-recognition
```

Then add to ChatBox component.

## Translations

All translations are already complete! The chatbox supports:
- 🇬🇧 English
- 🇪🇸 Spanish
- 🇮🇳 Hindi
- 🇮🇳 Kannada
- 🇮🇳 Malayalam

To add more translated suggestions, edit `/components/translations.ts`:
```typescript
aiHelpSuggestion1: "Your new suggestion",
aiHelpSuggestion2: "Another suggestion",
aiHelpSuggestion3: "Third suggestion",
```

## Security Best Practices

⚠️ **NEVER expose API keys in frontend code!**

✅ **DO:**
- Use Supabase Edge Functions
- Use backend API routes
- Store keys in environment variables (server-side only)
- Implement rate limiting
- Add user authentication checks

❌ **DON'T:**
- Put API keys in frontend code
- Commit `.env` files to Git
- Share API keys publicly
- Skip rate limiting

## Monitoring & Analytics

Track chatbox usage:

```typescript
// In handleSendMessage, add analytics:
const handleSendMessage = async () => {
  // ... existing code ...
  
  // Track usage
  await supabase.from('chat_analytics').insert({
    user_id: userId,
    message_sent: true,
    timestamp: new Date(),
    language: currentLanguage
  });
};
```

## Troubleshooting

### Chat button doesn't appear
- Make sure you're logged in as a Citizen (not volunteer)
- Check `userMode === "user"` condition in HomePage.tsx

### Messages don't send
- Check browser console for errors
- Verify API endpoint is accessible
- Test network connectivity

### Styling issues
- Clear browser cache
- Check dark mode settings
- Verify Tailwind classes are loaded

### Translation missing
- Check translations.ts has all required keys
- Verify language is supported
- Check fallback to English

## Next Steps

1. ✅ Choose an AI integration option (OpenAI recommended)
2. ✅ Set up Supabase Edge Function or backend endpoint
3. ✅ Add environment variables securely
4. ✅ Test with real AI responses
5. ✅ Add rate limiting and abuse prevention
6. ✅ Monitor usage and costs
7. ✅ Consider adding conversation persistence

## Cost Estimates

**OpenAI GPT-3.5 Turbo:**
- ~$0.0015 per conversation (input) + $0.002 per response (output)
- 1000 conversations ≈ $3.50

**Anthropic Claude Haiku:**
- ~$0.00025 per 1K input tokens + $0.00125 per 1K output tokens
- More cost-effective for high volume

## Support

For help with implementation:
1. Check Supabase Edge Functions docs
2. Review OpenAI API documentation
3. Test with smaller batches first
4. Monitor costs in provider dashboard

---

**The chatbox is ready to use!** It's currently working with mock responses. Follow the steps above to connect real AI.
