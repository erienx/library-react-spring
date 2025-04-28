
const DummyLoadingCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-gradient-to-t from-bg to-bg-lighter p-4 rounded-xl animate-pulse h-72" />
            ))}
          </div>
  )
}

export default DummyLoadingCards