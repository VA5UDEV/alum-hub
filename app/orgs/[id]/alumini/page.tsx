import AlumniDirectory from "./AlumniDirectory";

export default function AlumniPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Alumni Directory</h1>
      <AlumniDirectory orgId={Number(params.id)} />
    </div>
  );
}
