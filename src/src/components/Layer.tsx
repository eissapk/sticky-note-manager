// @ts-expect-error -- todo
const Layer = ({ setLayerIsShown, layerIsShown }) => {
  return (
    <>
      {layerIsShown && <div onClick={() => setLayerIsShown(false)} className="w-full h-screen bg-[rgba(0,0,0,0.7)] absolute left-0 top-0 z-10"></div>}
    </>
  );
};
export default Layer;
