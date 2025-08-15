function Grid(props: React.ComponentProps<"div">) {
  return (
    <div {...props} className={props.className}>
      {props.children}
    </div>
  );
}

function GridItem(props: React.ComponentProps<"div">) {
  return (
    <div {...props} className={props.className}>
      {props.children}
    </div>
  );
}

Grid.Item = GridItem;

export default Grid;
