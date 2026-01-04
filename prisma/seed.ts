import { AppStatus, PrismaClient } from '../generated/prisma/client';
import type { JobApplication } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const seedData = [
    {
        companies: [
            'Tah Tech',
            'Amazon',
            'Google',
            'Facebook',
            'Microsoft',
            'Apple',
            'Twitter',
            'LinkedIn',
            'Instagram',
            'YouTube',
            'Snapchat',
            'TikTok',
            'Pinterest',
            'Reddit',
            'Discord',
            'Telegram',
            'WhatsApp',
            'Skype',
            'Zoom',
            'Dropbox',
            'Salesforce',
            'HubSpot',
            'Shopify',
            'Stripe',
            'Square',
            'Uber',
            'Lyft',
            'DoorDash',
            'Postmates',
            'Grubhub',
            'Doordash',
            'Postmates',
            'Grubhub',
            'Doordash',
            'Wells Fargo',
            'JPMorgan Chase',
            'Bank of America',
            'Citigroup',
            'Goldman Sachs',
            'Morgan Stanley',
            'Barclays',
            'Credit Suisse',
            'Deutsche Bank',
            'BlackRock',
            'Morgan Stanley',
            'Barclays',
            'Credit Suisse',
            'Deutsche Bank',
            'BlackRock',
            'Morgan Stanley',
            'Barclays',
            'Credit Suisse',
            'Vanguard',
            'Fidelity',
            'Charles Schwab',
            'E*Trade',
            'Robinhood',
            'TD Ameritrade',
            'Interactive Brokers',
            'Charles Schwab',
            'E*Trade',
            'Tesla',
            'SpaceX',
            'Neuralink',
            'OpenAI',
            'Anthropic',
            'Perplexity',
            'Grok',
            'Claude',
            'Gemini',
            'DALL-E',
            'Midjourney',
            'Stable Diffusion',
            'Runway',
            'Figma',
            'Canva',
            'Meta',
        ],
        roles: [
            'Software Engineer',
            'Software Architect',
            'Full Stack Developer',
            'Frontend Developer',
            'Backend Developer',
            'DevOps Engineer',
            'Data Scientist',
            'Data Analyst',
            'Data Engineer',
            'Tools Engineer',
            'Database Architect',
            'Database Administrator',
            'Security Engineer',
            'Network Engineer',
            'System Administrator',
            'System Analyst',
            'System Developer',
            'System Architect',
            'Cracked Software Engineer',
            'AI Engineer',
            'AI-Enabled Developer'
        ],
        statuses: [
            'Applied',
            'Interviewing',
            'Offer',
            'Rejected',
            'FollowUp'
        ],
        notes: [
            'Applied for the role',
            'Interviewing for the role',
            'Offer received for the role',
            'Rejected for the role',
            'FollowUp for the role',
            'They are taking a long time to get back to me',
            'Do you really think I can get this job?',
            'I am really worried I am not qualified for this job',
            "What happens to my family if I don't get this job?",
            "We will all starve to death if I don't get this job!",
            'I honestly seem overqualified for this job',
            'I am not sure if I want to work for this company',
        ]
    }
]

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
async function main() {
    const NUM_OF_APPLICATIONS = 50;
    const seed = seedData[0]!;
    for (let i = 0; i < NUM_OF_APPLICATIONS; i++) {
        const company = seed.companies[Math.floor(Math.random() * seed.companies.length)]
        const role = seed.roles[Math.floor(Math.random() * seed.roles.length)]
        const status = seed.statuses[Math.floor(Math.random() * seed.statuses.length)]
        const notes = seed.notes[Math.floor(Math.random() * seed.notes.length)]

        const application = await prisma.jobApplication.create({
            data: {
                company: company!,
                role: role!,
                job_url: `https://www.${company!.toLowerCase().replace(/\s+/g, '-')}.com`,
                status: status as AppStatus,
                notes: notes ?? null,
            }
        });
        console.log(`Created application ${i + 1} of ${NUM_OF_APPLICATIONS}`);
        console.log(application);
        console.log('--------------------------------');


    }


}
main().catch(console.error).finally(async () => {
    await prisma.$disconnect();
});