export const CollectionCard = ({ title, description }) => {
    return (
      <div className="py-8 px-4 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <button className="px-6 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors">
          DISCOVER NOW
        </button>
      </div>
    );
  };