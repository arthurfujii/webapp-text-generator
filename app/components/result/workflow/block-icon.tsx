import type { FC } from 'react'
import { memo } from 'react'
import { BlockEnum } from '@/types/app'
import {
  Answer,
  Code,
  End,
  Home,
  Http,
  IfElse,
  KnowledgeRetrieval,
  Llm,
  QuestionClassifier,
  TemplatingTransform,
  VariableX,
} from '@/app/components/base/icons/workflow'
import AppIcon from '@/app/components/base/app-icon'

type BlockIconProps = {
  type: BlockEnum
  size?: string
  className?: string
  toolIcon?: string | { content: string; background: string }
}
const ICON_CONTAINER_CLASSNAME_SIZE_MAP: Record<string, string> = {
  xs: 'w-4 h-4 rounded-sm shadow-soft',
  sm: 'w-5 h-5 rounded-sm shadow-soft',
  md: 'w-6 h-6 rounded-md shadow-soft',
}
const getIcon = (type: BlockEnum, className: string) => {
  return {
    [BlockEnum.Start]: <Home className={className} />,
    [BlockEnum.LLM]: <Llm className={className} />,
    [BlockEnum.Code]: <Code className={className} />,
    [BlockEnum.End]: <End className={className} />,
    [BlockEnum.IfElse]: <IfElse className={className} />,
    [BlockEnum.HttpRequest]: <Http className={className} />,
    [BlockEnum.Answer]: <Answer className={className} />,
    [BlockEnum.KnowledgeRetrieval]: <KnowledgeRetrieval className={className} />,
    [BlockEnum.QuestionClassifier]: <QuestionClassifier className={className} />,
    [BlockEnum.TemplateTransform]: <TemplatingTransform className={className} />,
    [BlockEnum.VariableAssigner]: <VariableX className={className} />,
    [BlockEnum.Tool]: <VariableX className={className} />,
  }[type]
}
const ICON_CONTAINER_BG_COLOR_MAP: Record<string, string> = {
  [BlockEnum.Start]: 'bg-forest-dark',
  [BlockEnum.LLM]: 'bg-earth-amber',
  [BlockEnum.Code]: 'bg-info',
  [BlockEnum.End]: 'bg-warning',
  [BlockEnum.IfElse]: 'bg-forest-medium',
  [BlockEnum.HttpRequest]: 'bg-[#6B5A45]',
  [BlockEnum.Answer]: 'bg-warning',
  [BlockEnum.KnowledgeRetrieval]: 'bg-success',
  [BlockEnum.QuestionClassifier]: 'bg-success',
  [BlockEnum.TemplateTransform]: 'bg-info',
  [BlockEnum.VariableAssigner]: 'bg-info',
}
const BlockIcon: FC<BlockIconProps> = ({
  type,
  size = 'sm',
  className,
  toolIcon,
}) => {
  return (
    <div className={`
      flex items-center justify-center border border-charcoal/10 text-cream-base rounded-sm
      ${ICON_CONTAINER_CLASSNAME_SIZE_MAP[size]} 
      ${ICON_CONTAINER_BG_COLOR_MAP[type]}
      ${toolIcon && '!shadow-none'}
      ${className}
    `}
    >
      {
        type !== BlockEnum.Tool && (
          getIcon(type, size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5')
        )
      }
      {
        type === BlockEnum.Tool && toolIcon && (
          <>
            {
              typeof toolIcon === 'string'
                ? (
                  <div
                    className='shrink-0 w-full h-full bg-cover bg-center rounded-md'
                    style={{
                      backgroundImage: `url(${toolIcon})`,
                    }}
                  ></div>
                )
                : (
                  <AppIcon
                    className='shrink-0 !w-full !h-full'
                    size='tiny'
                    icon={toolIcon?.content}
                    background={toolIcon?.background}
                  />
                )
            }
          </>
        )
      }
    </div>
  )
}

export const VarBlockIcon: FC<BlockIconProps> = ({
  type,
  className,
}) => {
  return (
    <>
      {getIcon(type, `w-3 h-3 ${className}`)}
    </>
  )
}

export default memo(BlockIcon)
