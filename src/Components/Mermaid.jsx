import { useEffect } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false });

function Mermaid({ chart, setSvgText, svgText }) {

  useEffect(() => {
    const renderDiagram = async () => {
      if (await mermaid.parse(chart)) {
        const { svg } = await mermaid.render('rArea', chart);
        setSvgText(svg);
      }
    };
    renderDiagram();
  }, [chart]);

  return (
    <div>
      <div id="rArea"></div>
      {svgText && <div dangerouslySetInnerHTML={{ __html: svgText }} />}
    </div>
  );
}

export default Mermaid;
