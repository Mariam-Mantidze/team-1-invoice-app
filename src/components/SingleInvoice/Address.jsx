export default function Address({ owner }) {
  return (
    <div>
      <div>
        <p>{owner.street}</p>
        <p>{owner.city}</p>
        <p>{owner.postCode}</p>
        <p>{owner.country}</p>
      </div>
    </div>
  );
}
