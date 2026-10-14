export interface PublicLink {
  platform: string; url: string; purpose: string; order: number; featured: boolean;
  group: 'Code' | 'Connect' | 'Watch';
}
export const site = {
  name: 'Muhammed Rinshid V P',
  shortName: 'Rinshid',
  title: "Rinshid’s notebook",
  url: process.env.SITE_URL || 'https://rinshid-note.vercel.app',
  bio: 'CS student and builder from Kerala, writing about AI, learning, and making time for what matters.',
  mastheadNote: 'Learn by building. Make time for what matters.',
  themes: [
    { title: 'Engineering in the AI era', summary: 'Prompt and context engineering, new tools, and how to think critically while using AI.' },
    { title: 'Learning through building', summary: 'Practical projects, experiments, and turning what we learn into something that works.' },
    { title: 'Time, focus & productivity', summary: 'Making room for meaningful work and using our time deliberately.' },
    { title: 'Attention & personal growth', summary: 'Social-media habits, distraction, and developing ourselves alongside our technical skills.' },
  ],
  email: 'muhammedrinshidvpr@gmail.com',
  location: 'Kerala, India',
  navigation: [
    { label: 'Home', path: '/' }, { label: 'Writing', path: '/writing/' },
    { label: 'About', path: '/about/' },
  ],
  secondary: [
    { label: 'Student guides', path: '/guides/' }, { label: 'Videos', path: '/videos/' },
    { label: 'Contact', path: '/contact/' }, { label: 'All links', path: '/links/' },
  ],
  links: [
    { platform: 'Portfolio', url: 'https://rinshid-portfolio.vercel.app/', purpose: 'My projects, experience, and professional work — separate from this notebook.', order: 0, featured: true, group: 'Connect' },
    { platform: 'GitHub', url: 'https://github.com/rinshidvp', purpose: 'Source code, experiments, releases, and project discussions.', order: 1, featured: true, group: 'Code' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/rinshidrazaq/', purpose: 'My professional profile and a place to connect.', order: 2, featured: true, group: 'Connect' },
    { platform: 'YouTube', url: 'https://www.youtube.com/@RinshidRazaq', purpose: 'My channel, under the name Rinshid Razaq.', order: 3, featured: true, group: 'Watch' },
    { platform: 'Instagram', url: 'https://www.instagram.com/rinshidrazaq/', purpose: 'Find me as @rinshidrazaq.', order: 4, featured: true, group: 'Connect' },
  ] satisfies PublicLink[],
};
export const publicLinks = [...site.links].sort((a, b) => a.order - b.order);
