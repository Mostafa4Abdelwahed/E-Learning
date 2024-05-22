import { useState } from "react";
import { MdSlowMotionVideo } from "react-icons/md";

export const Item = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border-b">
        <button
          type="button"
          aria-label="Open item"
          title="Open item"
          className="flex items-center justify-between w-full p-4 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-lg font-bold flex items-center gap-4 text-white"><MdSlowMotionVideo className="text-xl"/>{title}</p>
          <svg
            viewBox="0 0 24 24"
            className={`w-3 text-white transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="2,7 12,17 22,7"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="p-4 pt-0">
            <p className="text-gray-300">{children}</p>
          </div>
        )}
      </div>
    );
  };
  