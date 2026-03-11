import { Service } from "@/types";

export const services: Service[] = [
    {
        id: "web-development",
        name: "Web Development",
        description:
            "Full-stack web development service including design and deployment.",
        price: 299,
        duration: "7 days",
        icon: "💻",
    },
    {
        id: "ui-ux-design",
        name: "UI/UX Design",
        description:
            "Professional UI/UX design with Figma prototypes and user research.",
        price: 199,
        duration: "5 days",
        icon: "🎨",
    },
    {
        id: "seo-optimization",
        name: "SEO Optimization",
        description: "Complete SEO audit and optimization for better rankings.",
        price: 149,
        duration: "3 days",
        icon: "📈",
    },
    {
        id: "mobile-app",
        name: "Mobile App Development",
        description: "Cross-platform mobile app built with React Native.",
        price: 499,
        duration: "14 days",
        icon: "📱",
    },
    {
        id: "cloud-setup",
        name: "Cloud Infrastructure Setup",
        description: "AWS/GCP cloud setup, CI/CD pipelines and deployment.",
        price: 249,
        duration: "4 days",
        icon: "☁️",
    },
    {
        id: "consulting",
        name: "Tech Consulting",
        description: "1-on-1 technical consulting session for your project.",
        price: 99,
        duration: "2 hours",
        icon: "🧠",
    },
];

export function getServiceById(id: string): Service | undefined {
    return services.find((s) => s.id === id);
}
