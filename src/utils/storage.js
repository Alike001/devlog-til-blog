//localStorage keys
export const KEYS = {
  users: 'devlog_users',
  currentUser: 'devlog_currentUser',
  posts: 'devlog_posts',
  history: 'devlog_history',
}

// example of posts that appear when the app loads for the first time.
export const SEED_POSTS = [
  {
    id: '1',
    title: 'TIL: How the CSS Box Model Actually Works',
    body: 'I always struggled with spacing in CSS until I truly understood the box model. Every HTML element is a box made of four layers: content, padding, border, and margin.\n\nContent is your actual text or image. Padding is the space inside the border. Border wraps around the padding. Margin is the space outside the border.\n\nThe key insight: by default, width and height only apply to the content box. So if you set width: 200px and add padding: 20px, your element ends up being 240px wide!\n\nThe fix is simple: add box-sizing: border-box to everything. This makes width include padding and border, so sizing becomes predictable.\n\n* { box-sizing: border-box; } — put this in every project from now on.',
    tag: 'CSS',
    author: 'Amara',
    authorId: 'seed-1',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'TIL: Git Rebase vs Merge — Finally Makes Sense',
    body: 'After months of just using git merge for everything, I finally understand when to use rebase.\n\nMerge keeps the full history of both branches and creates a merge commit. Your history looks exactly like what happened — branches, forks, and all. Great for shared branches.\n\nRebase replays your commits on top of another branch, making history look like everything happened in a straight line. Much cleaner for feature branches before merging to main.\n\nThe golden rule I learned: never rebase a branch that others are working on. It rewrites history and causes chaos.\n\nMy workflow now: rebase my local feature branch onto main before opening a PR, then merge the PR. Clean history, no drama.',
    tag: 'Git',
    author: 'Aisha',
    authorId: 'seed-2',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'TIL: What Closures in JavaScript Actually Are',
    body: 'I used closures without knowing it for months. Today it finally clicked.\n\nA closure is when a function "remembers" the variables from the place where it was created, even after that outer function has finished running.\n\nSimple example:\n\nfunction makeCounter() {\n  let count = 0\n  return function() {\n    count++\n    return count\n  }\n}\n\nconst counter = makeCounter()\ncounter() // 1\ncounter() // 2\ncounter() // 3\n\nThe inner function still has access to count even though makeCounter() is done. That is a closure.\n\nThis is how useState in React works under the hood. Mind blown.',
    tag: 'JavaScript',
    author: 'Zainab',
    authorId: 'seed-3',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'TIL: React useEffect Dependency Array Rules',
    body: 'The useEffect hook confused me until I understood the dependency array properly.\n\nuseEffect(() => { ... }) — runs after every render\nuseEffect(() => { ... }, [])  — runs only once on mount\nuseEffect(() => { ... }, [value])  — runs when value changes\n\nThe mistake I kept making: putting an object or array in the dependency array. Objects are compared by reference in JavaScript, not by value. So even if the content is the same, React sees a "new" object every render and the effect runs in an infinite loop.\n\nFix: use primitive values (strings, numbers, booleans) in the dependency array, or use useCallback and useMemo for functions and objects.\n\nAlso learned: always clean up side effects by returning a function from useEffect.',
    tag: 'React',
    author: 'Ebuka',
    authorId: 'seed-4',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
]

//read from localStorage safely
export function load(key, fallback) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

// write to localStorage
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}