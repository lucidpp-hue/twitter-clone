// Firebase has been replaced with Supabase
// These stubs prevent breaking other files but functions should not be called

export async function checkUsernameAvailability(
  username: string
): Promise<boolean> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export async function getCollectionCount<T>(
  collection: any
): Promise<number> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export async function updateUserData(
  userId: string,
  userData: any
): Promise<void> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export async function updateUserTheme(
  userId: string,
  themeData: any
): Promise<void> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export async function updateUsername(
  userId: string,
  username?: string
): Promise<void> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export async function managePinnedTweet(
  type: 'pin' | 'unpin',
  userId: string,
  tweetId: string
): Promise<void> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export async function manageFollow(
  type: 'follow' | 'unfollow',
  userId: string,
  targetUserId: string
): Promise<void> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export async function removeTweet(tweetId: string): Promise<void> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export async function uploadImages(
  userId: string,
  files: any
): Promise<any> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export async function manageReply(
  type: 'increment' | 'decrement',
  tweetId: string
): Promise<void> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export async function manageTotalTweets(
  type: 'increment' | 'decrement',
  userId: string
): Promise<void> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export async function manageTotalPhotos(
  type: 'increment' | 'decrement',
  userId: string
): Promise<void> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export function manageRetweet(
  type: 'retweet' | 'unretweet',
  userId: string,
  tweetId: string
) {
  return async (): Promise<void> => {
    throw new Error('Firebase is no longer used. Use Supabase instead.');
  };
}

export function manageLike(
  type: 'like' | 'unlike',
  userId: string,
  tweetId: string
) {
  return async (): Promise<void> => {
    throw new Error('Firebase is no longer used. Use Supabase instead.');
  };
}

export async function manageBookmark(
  type: 'bookmark' | 'unbookmark',
  userId: string,
  tweetId: string
): Promise<void> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}

export async function clearAllBookmarks(userId: string): Promise<void> {
  throw new Error('Firebase is no longer used. Use Supabase instead.');
}
