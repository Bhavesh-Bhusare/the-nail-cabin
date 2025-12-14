import { Star } from "lucide-react";
import { businessInfo } from "../../mock";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {businessInfo.name}
          </h1>
          <p className="text-sm text-gray-600">{businessInfo.nameHindi}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 font-semibold text-gray-800">
              {businessInfo.rating}
            </span>
            <span className="ml-1 text-sm text-gray-600">
              ({businessInfo.reviewCount})
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
