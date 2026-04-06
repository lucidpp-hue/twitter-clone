-- Create profiles table linked to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  cover_photo_url TEXT,
  website TEXT,
  location TEXT,
  verified BOOLEAN DEFAULT FALSE,
  following TEXT[] DEFAULT '{}',
  followers TEXT[] DEFAULT '{}',
  theme TEXT,
  accent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- Create tweets table
CREATE TABLE IF NOT EXISTS public.tweets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  reply_count INTEGER DEFAULT 0,
  retweet_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  parent_tweet_id UUID REFERENCES public.tweets(id) ON DELETE CASCADE
);

-- Enable RLS for tweets
ALTER TABLE public.tweets ENABLE ROW LEVEL SECURITY;

-- Create policies for tweets
CREATE POLICY "Tweets are viewable by everyone" ON public.tweets
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own tweets" ON public.tweets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tweets" ON public.tweets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tweets" ON public.tweets
  FOR DELETE USING (auth.uid() = user_id);
