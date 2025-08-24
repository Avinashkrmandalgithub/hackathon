import React from 'react'

const feedbacks = [
  {
    id: 1,
    text: "The waiting list felt endless until I registered on OrganBridge. The system helped me find a compatible liver donor quickly, and the hospital received instant alerts. I am deeply grateful to the donors and this technology for saving my life.",
    name: "Anita Pathak",
    role: "Liver Transplant Recipient",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 2,
    text: "Thanks to OrganBridge, I found a suitable donor in time. The priority tracking feature kept my case visible to hospitals, and the doctors could act fast. I cannot express how thankful I am for this platform.",
    name: "Sameer Hemant",
    role: "Heart Transplant Recipient",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 3,
    text: "My son needed a transplant urgently. OrganBridge connected us to hospitals and medical professionals who coordinated everything smoothly. The timely alerts truly made a difference — my child is alive because of this system.",
    name: "Kabir Dubey",
    role: "Father of a Child Recipient",
    img: "https://randomuser.me/api/portraits/men/48.jpg",
  },
  {
    id: 4,
    text: "I had been waiting for a kidney transplant for over 3 years. Through OrganBridge, I was matched with a donor in just a few weeks. The platform kept me updated with real-time notifications, and today, I have a new lease on life.",
    name: "Ramesh Kumar",
    role: "Kidney Transplant Recipient",
    img: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];

export default function PatientFeedback() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-6">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Patient Feedback <span className="font-normal">:-</span>
      </h2>

      {/* Feedback Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
        {feedbacks.map((f) => (
          <div
            key={f.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col justify-between"
          >
            <p className="text-gray-700 italic mb-6">"{f.text}"</p>
            <div className="flex items-center space-x-4">
              <img
                src={f.img}
                alt={f.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-gray-900 font-semibold">{f.name}</h4>
                <p className="text-gray-500 text-sm">({f.role})</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-12">
        <button className="bg-black text-white px-6 py-2 rounded-md shadow hover:bg-gray-800 transition">
          See more
        </button>
      </div>
    </section>
  );
}