# ChatBox Quick Start Guide 🚀

## What You Got

A **beautiful, animated AI chatbox** that appears only for Citizens (not volunteers) in your Emergency Response app!

## See It In Action

1. **Start your app:**
   ```bash
   npm run dev
   ```

2. **Log in as a Citizen** (not volunteer)
   - Username: `user` 
   - Password: `password` (or whatever you set)

3. **Look for the purple floating button** in the bottom-right corner

4. **Click it!** The chat will smoothly expand

5. **Try it out:**
   - Click one of the quick suggestions
   - Type your own message
   - Watch the typing indicator
   - See the smooth animations

## Current State: WORKING ✅

The chatbox is **fully functional** with mock AI responses. It can answer questions about:
- Reporting emergencies
- Verification process  
- Offline features
- Privacy settings
- Adding photos
- Tracking reports

## To Add Real AI (3 Easy Steps)

### Step 1: Choose Your AI Provider

**Option A: OpenAI (Easiest)**
- Sign up at https://platform.openai.com/
- Get API key
- Cost: ~$0.002 per message

**Option B: Anthropic Claude**
- Sign up at https://anthropic.com/
- More affordable
- Similar quality

### Step 2: Set Up Supabase Edge Function

Create a file: `supabase/functions/chat/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { message } = await req.json()
  
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
          content: 'You are an emergency response assistant helping users report emergencies, understand privacy settings, and track their reports. Be concise and helpful.'
        },
        { role: 'user', content: message }
      ],
      max_tokens: 300,
    })
  })
  
  const data = await response.json()
  return new Response(
    JSON.stringify({ reply: data.choices[0].message.content }),
    { headers: { "Content-Type": "application/json" } }
  )
})
```

Deploy it:
```bash
supabase functions deploy chat
supabase secrets set OPENAI_API_KEY=sk-your-key-here
```

### Step 3: Update ChatBox.tsx

Find the `generateAIResponse` function (around line 60) and replace it:

```typescript
const generateAIResponse = async (userInput: string): Promise<string> => {
  try {
    const response = await fetch(
      'YOUR_SUPABASE_URL/functions/v1/chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_SUPABASE_ANON_KEY'
        },
        body: JSON.stringify({ message: userInput })
      }
    );
    
    const data = await response.json();
    return data.reply;
  } catch (error) {
    return "I'm having trouble connecting. Please try again.";
  }
};
```

Also make `handleSendMessage` async (add `async` keyword).

## That's It! 🎉

Your chatbox will now use real AI!

## Customization

### Change Colors
In `ChatBox.tsx`, replace:
```typescript
from-purple-600 to-indigo-700
```
With your preferred colors:
```typescript
from-blue-600 to-cyan-700    // Blue
from-green-600 to-emerald-700 // Green  
from-red-600 to-pink-700      // Red
```

### Move the Button
Change position in `ChatBox.tsx`:
```typescript
// Current (bottom-right):
className="fixed bottom-6 right-6 z-50"

// Bottom-left:
className="fixed bottom-6 left-6 z-50"

// Top-right:
className="fixed top-6 right-6 z-50"
```

### Change Window Size
```typescript
// Current:
w-[380px] h-[600px]

// Bigger:
w-[450px] h-[700px]

// Smaller:
w-[320px] h-[500px]
```

## Testing Checklist

- [ ] Floating button appears (only for citizens)
- [ ] Button has pulse animation
- [ ] Chat opens smoothly when clicked
- [ ] Welcome message appears
- [ ] Quick suggestions are clickable
- [ ] Can type and send messages
- [ ] Typing indicator shows
- [ ] Messages auto-scroll
- [ ] Can close chat with X button
- [ ] Works in all languages
- [ ] Works in dark mode
- [ ] Responsive on mobile

## Troubleshooting

**Button doesn't appear?**
- Make sure you're logged in as Citizen (not volunteer)
- Check browser console for errors

**Can't send messages?**
- Check if input field is disabled
- Try refreshing the page

**Styling looks wrong?**
- Clear browser cache
- Make sure Tailwind is compiled

**Translation missing?**
- All translations are already added!
- Check your language setting

## Files Modified

✅ Created:
- `/components/ChatBox.tsx` - Main chatbox component
- `/CHATBOX_INTEGRATION_GUIDE.md` - Detailed integration guide
- `/CHATBOX_FEATURES.md` - Feature documentation

✅ Modified:
- `/components/pages/HomePage.tsx` - Added ChatBox import and component
- `/components/translations.ts` - Added Malayalam translation for rejectReport

## Support Resources

- **Full Integration Guide:** See `CHATBOX_INTEGRATION_GUIDE.md`
- **Features List:** See `CHATBOX_FEATURES.md`
- **OpenAI Docs:** https://platform.openai.com/docs
- **Supabase Edge Functions:** https://supabase.com/docs/guides/functions

## Next Steps

1. ✅ Test the chatbox (it works with mock responses!)
2. ⏳ Set up Supabase Edge Function (optional, for real AI)
3. ⏳ Add your OpenAI API key (optional)
4. ⏳ Deploy and enjoy! 

---

**Your chatbox is ready! The mock version works perfectly for testing and demos. Add real AI when you're ready to go live! 🎊**
