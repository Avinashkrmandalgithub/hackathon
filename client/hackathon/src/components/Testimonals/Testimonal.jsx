import React from "react";
import feedbacks from '../../data/testimonialsData.json'

export default function PatientFeedback() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Patient Feedback <span className="font-normal"></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
        {feedbacks.map((f) => (
          <div
            key={f.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition transform p-6 flex flex-col justify-between"
          >
            <p className="text-gray-700 italic mb-6">"{f.text}"</p>
            <div className="flex items-center space-x-4">
              <img
                src={f.img}
                alt={f.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="text-gray-900 font-semibold">{f.name}</h4>
                <p className="text-gray-500 text-sm">({f.role})</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <button className="bg-black text-white px-6 py-2 rounded-md shadow hover:bg-gray-800 transition">
          See more
        </button>
      </div>
    </section>
  );
}
