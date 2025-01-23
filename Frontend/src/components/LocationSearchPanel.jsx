const LocationSearchPanel = ({
  setPanelOpen,
  setVehiclePanelOpen,
  suggestions,
  loading,
  error,
  onSuggestionSelect,
}) => {
  return (
    <div className="p-4">
      {loading && (
        <div className="text-center py-4">Loading suggestions...</div>
      )}

      {error && <div className="text-center py-4 text-red-500">{error}</div>}

      {!loading && !error && suggestions.length === 0 && (
        <div className="text-center py-4">
          Type at least 3 characters to search
        </div>
      )}

      {!loading &&
        !error &&
        suggestions.map((suggestion, index) => (
          <div
            key={suggestion.place_id}
            className="flex gap-4 border-2 active:border-black p-3 rounded-xl my-2 items-center justify-start cursor-pointer hover:bg-gray-50"
            onClick={() => onSuggestionSelect(suggestion)}
          >
            <h2 className="bg-[#eeeeee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <div>
              <h4 className="font-medium">
                {suggestion.structured_formatting.main_text}
              </h4>
              <p className="text-sm text-gray-500">
                {suggestion.structured_formatting.secondary_text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LocationSearchPanel;
