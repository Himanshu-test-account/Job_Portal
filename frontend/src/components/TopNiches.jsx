import React from "react";

const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Software Development",
      description:
        "A wide range of roles involving the development of applications, websites, and software solutions using various programming languages and technologies.",
    },
    {
      id: 2,
      service: "Design & Creative",
      description:
        "Creative roles including graphic design, web design, UX/UI design, animation, and other forms of visual art and digital design.",
    },
    {
      id: 3,
      service: "Marketing & Sales",
      description:
        "Roles focused on promoting products and services, customer acquisition, digital marketing, SEO, advertising, and sales strategies.",
    },
    {
      id: 4,
      service: "Customer Support",
      description:
        "Roles focused on assisting customers with inquiries, technical issues, or general customer service through various channels like email, phone, and live chat.",
    },
    {
      id: 5,
      service: "Finance & Accounting",
      description:
        "Jobs in financial analysis, bookkeeping, accounting, tax preparation, and auditing, helping businesses manage their finances.",
    },
    {
      id: 6,
      service: "Human Resources",
      description:
        "HR roles include recruitment, employee relations, training and development, payroll management, and performance evaluation.",
    },
    {
      id: 7,
      service: "Writing & Content Creation",
      description:
        "Writing-focused jobs, including content creation, copywriting, blogging, editing, and technical writing for websites, marketing materials, and more.",
    },
    {
      id: 8,
      service: "Project Management",
      description:
        "Managing projects across various industries, ensuring timelines, budgets, and resources are effectively allocated and projects are delivered successfully.",
    },
    {
      id: 9,
      service: "Data Science & Analytics",
      description:
        "Jobs in data analysis, machine learning, statistical modeling, data visualization, and insights generation to help companies make data-driven decisions.",
    },
    {
      id: 10,
      service: "Legal Services",
      description:
        "Legal professionals including lawyers, paralegals, legal assistants, and consultants, handling contracts, litigation, compliance, and legal advice.",
    },
    {
      id: 11,
      service: "Healthcare",
      description:
        "Healthcare roles including doctors, nurses, therapists, healthcare technicians, and administrative staff working in hospitals, clinics, and other healthcare settings.",
    },
    {
      id: 12,
      service: "Education & Training",
      description:
        "Teaching roles in schools, universities, training programs, and corporate environments, including subject-specific teaching and educational support roles.",
    },
    {
      id: 13,
      service: "Engineering",
      description:
        "A variety of engineering roles across different fields such as civil, mechanical, electrical, and chemical engineering, focused on designing, building, and maintaining systems and structures.",
    },
    {
      id: 14,
      service: "Construction & Trades",
      description:
        "Skilled labor roles, including carpenters, electricians, plumbers, construction workers, and tradespeople working on residential, commercial, and industrial projects.",
    },
    {
      id: 15,
      service: "Admin & Office Support",
      description:
        "Office support roles like administrative assistants, executive assistants, data entry clerks, office managers, and more to keep the office running smoothly.",
    },
  ];

  return (
    <section className="services">
      <h3>Top Niches</h3>
      <div className="grid">
        {services.map((element) => {
          return (
            <div className="card" key={element.id}>
              <h4>{element.service}</h4>
              <p>{element.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopNiches;
