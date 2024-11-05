export default function PageLoading() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-200/50"
      aria-hidden
    >
      <span className="h-12 w-12 animate-spin rounded-full border-t-4 border-pink-600" />
    </div>
  );
}
