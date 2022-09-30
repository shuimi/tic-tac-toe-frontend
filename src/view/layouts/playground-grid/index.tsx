import { Playground } from "../../../data";
import { SimpleGrid } from "@mantine/core";
import { PlaygroundCell } from "../../components";
import { useId } from "react";

interface PlaygroundGridProps extends Playground {
  onCellClick?: (position: number) => void,
  sellSize?: number,
  spacing?: number,
}

export const PlaygroundGridLayout = (props: PlaygroundGridProps) => {

  const {rank, data, sellSize = 120, spacing = 5, onCellClick} = props

  const playgroundId = useId()

  return <SimpleGrid cols={rank} spacing={spacing}>
    {
      data.map((cell) => <PlaygroundCell
          key={`${playgroundId}/${cell.position}`}
          mark={cell.mark}
          size={sellSize}
          onClick={() => {
            onCellClick && onCellClick(cell.position)
          }}
        />
      )
    }
  </SimpleGrid>
}