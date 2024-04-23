import Roti from "../../../assets/roti.avif";
import Minuman from "../../../assets/minuman.avif";
import Cake from "../../../assets/cake.avif";

const Home = () => {
  return (
    <div>
      <div className="container mx-auto px-6">
        <div
          className="h-64 rounded-md overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${Cake})`,
            backgroundPosition: "center 25%",
          }}
        >
          <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
            <div className="px-10 max-w-xl">
              <h2 className="text-2xl text-white font-semibold">Cake</h2>

              <button className="flex items-center mt-4 px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-secondary focus:outline-none focus:bg-blue-500">
                <span>Shop Now</span>
                <svg
                  className="h-5 w-5 mx-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Additional product sections can be added here similar to the above section */}

        <div className="md:flex mt-8 md:-mx-4">
          {/* More product sections */}
          <div
            className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
            style={{
              backgroundImage: `url(${Minuman})`,
              backgroundPosition: "center 25%",
            }}
          >
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Minuman</h2>
                <button className="flex items-center mt-4 px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-secondary focus:outline-none focus:bg-blue-500">
                  <span>Shop Now</span>
                  <svg
                    className="h-5 w-5 mx-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
            style={{
              backgroundImage: `url(${Roti})`,
            }}
          >
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Roti</h2>

                <button className="flex items-center mt-4 px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-secondary focus:outline-none focus:bg-blue-500">
                  <span>Shop Now</span>
                  <svg
                    className="h-5 w-5 mx-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h3 className="text-gray-600 text-2xl font-medium">Produk Lainnya</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {/* Add fashion items here as per original HTML */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
