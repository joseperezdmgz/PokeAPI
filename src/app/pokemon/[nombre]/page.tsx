export default async function Pokemon({
  params,
}: {
  params: { nombre: string };
}) {
  const pokemon = params.nombre;
  return (
    <div>
      <h1>{pokemon}</h1>
    </div>
  );
}
