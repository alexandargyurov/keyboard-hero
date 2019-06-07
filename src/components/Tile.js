import React from 'react'

function Tile() {
    return (
        <TileMap
            style={{ top: Math.floor(-63 * this.context.scale) }}
            src="assets/tile.png"
            rows={1}
            columns={6}
            tileSize={512}
            layers={[
                [1, 2, 3, 4, 5, 6],
            ]}
        />
    )
}

export default Tile