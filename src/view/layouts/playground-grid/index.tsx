import { Playground } from "../../../data";
import { SimpleGrid } from "@mantine/core";
import { PlaygroundCell } from "../../components";
import { useId } from "react";

interface PlaygroundGridProps extends Playground {
  onCellClick?: (position: number) => void,
  sellSize?: number,
}

export const PlaygroundGridLayout = (props: PlaygroundGridProps) => {

  const {rank, data, sellSize = 120} = props

  const playgroundId = useId()

  return <SimpleGrid cols={rank}>
    {
      data.map(cell => <PlaygroundCell
        key={`${playgroundId}/${cell.position}`}
        mark={cell.mark}
        size={sellSize}/>
      )
    }
  </SimpleGrid>
}