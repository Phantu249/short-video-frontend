export default function Test() {
  return (
    <div>
      <video controls>
        <source src='http://127.0.0.1:8000/media/test/output.m3u8' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
