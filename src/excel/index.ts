/**
 * @author 五灵
 * @desc 初始化 Excel
 */
import * as _ from 'lodash';
import { ExcelConfig } from './types';
import { DEFAULT_CONFIG } from './config';
import { Paint } from './paint';
import { CELL_WIDTH, CELL_HEIGHT } from './const';

class Excel {
  config: ExcelConfig;
  canvasContext: CanvasRenderingContext2D;
  constructor(config: Partial<ExcelConfig>) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config
    } as ExcelConfig;
    this.initCanvas();
  }
  /**
   * 初始化画布设置
   */
  initCanvas() {
    const { container } = this.config;
    this.canvasContext = container.getContext('2d') as CanvasRenderingContext2D;
    this.getRatio();
    this.setCanvas();
    new Paint(this.canvasContext, this.config);
  }
  /**
   * 设置画布的基础设置
   */
  setCanvas() {
    const { fontSize, fontFamily, lineColor } = this.config;
    this.canvasContext.lineWidth = 1;
    this.canvasContext.font = `normal ${fontSize}px ${fontFamily}`;
    this.canvasContext.textBaseline = 'middle';
    this.canvasContext.strokeStyle = lineColor;
    this.canvasContext.textAlign = 'center';
    this.canvasContext.save();
  }
  /**
   * 获取Ratio，处理高清屏模糊问题
   */
  getRatio() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    return devicePixelRatio;
  }
  /**
   * 获取画布的最大高度和宽度
   */
  getContainerRect() {
    const { data } = this.config;
    const rows = data.length;
    const cols = _.get(data, [0, 'length'], 0);
    return {
      width: cols * CELL_WIDTH,
      height: rows * CELL_HEIGHT
    };
  }
}

export { Excel };
