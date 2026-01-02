const MessageList = () => {
    return (
      <section className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="soft-card rounded-2xl p-4">
            <p className="text-xs text-gray-500 mb-1">
              농구
            </p>
            <p className="text-sm text-gray-800">
              7주년 너무 축하해요!
            </p>
          </div>
        ))}
      </section>
    );
  };
export default MessageList;