import React from 'react';
import { Course, CurrencyConfig } from '../types';
import { formatPrice } from '../utils/currencyUtils';
import { Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
  currency: CurrencyConfig;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, currency }) => {
  return (
    <div className="group relative bg-neon-surface border border-white/5 hover:border-neon-orange/50 transition-all duration-300 rounded-xl overflow-hidden flex flex-col h-full hover:shadow-neon-orange hover:-translate-y-2">

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-neon-surface to-transparent z-10 opacity-80" />
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-2 right-2 z-20 bg-black/70 backdrop-blur px-2 py-1 rounded border border-white/10">
          <span className="text-neon-blue text-xs font-bold uppercase tracking-wider">{course.level}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative z-20">
        <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-neon-orange transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {course.subtitle}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <Users size={14} className="text-neon-blue" />
            <span>{course.students} Alumnos</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span>{course.rating}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Precio</span>
            {course.originalPrice && (
              <span className="text-sm text-gray-500 line-through decoration-neon-orange/70">
                {formatPrice(course.originalPrice, currency)}
              </span>
            )}
            <span className="font-heading text-2xl font-bold text-white">
              {formatPrice(course.priceUSD, currency)}
            </span>
          </div>
          <Link to={`/curso/${course.id}`}>
            <button className="w-10 h-10 rounded-full border border-neon-orange/30 flex items-center justify-center text-neon-orange hover:bg-neon-orange hover:text-black transition-all">
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
