export const ListEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-semibold text-gray-700">
        No products found
      </h2>
      <p className="text-gray-500">Add a new product to get started</p>
    </div>
  );
};
