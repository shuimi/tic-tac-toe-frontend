import { Playground } from "../../../data";
import { MantineColor, SimpleGrid } from "@mantine/core";
import { PlaygroundCell } from "../../components";
import { useId } from "react";

interface PlaygroundGridProps extends Playground {
  onCellClick?: (position: number) => void,
  sellSize?: number,
  spacing?: number,
  color?: MantineColor,
}

export const PlaygroundGridLayout = (props: PlaygroundGridProps) => {

  const {rank, data, sellSize = 120, spacing = 5, onCellClick, color} = props

  const playgroundId = useId()

  return <SimpleGrid color={color} cols={rank} spacing={spacing}>
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