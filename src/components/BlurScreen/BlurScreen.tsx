import "./_blurscreen.scss";

interface BlurScreenProps {
  isBlurScreen: boolean;
  children?: React.ReactNode;
}
function BlurScreen(props: BlurScreenProps) {
  return (
    <div className="container-blur">
      <div className={`blur-screen${props.isBlurScreen ? "_true" : ""}`}>
        {props.children}
      </div>
      <div className={`black-screen${props.isBlurScreen ? "_true" : ""}`}></div>
    </div>
  );
}

export default BlurScreen;
