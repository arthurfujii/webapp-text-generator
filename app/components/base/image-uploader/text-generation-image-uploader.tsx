import type { FC } from 'react'
import {
  Fragment,
  useEffect,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import Uploader from './uploader'
import ImageLinkInput from './image-link-input'
import ImageList from './image-list'
import { useImageFiles } from './hooks'
import ImagePlus from '@/app/components/base/icons/line/image-plus'
import Link03 from '@/app/components/base/icons/line/link-03'
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '@/app/components/base/portal-to-follow-elem'
import type { ImageFile, VisionSettings } from '@/types/app'
import { TransferMethod } from '@/types/app'

type PasteImageLinkButtonProps = {
  onUpload: (imageFile: ImageFile) => void
  disabled?: boolean
}
const PasteImageLinkButton: FC<PasteImageLinkButtonProps> = ({
  onUpload,
  disabled,
}) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const handleUpload = (imageFile: ImageFile) => {
    setOpen(false)
    onUpload(imageFile)
  }

  const handleToggle = () => {
    if (disabled)
      return

    setOpen(v => !v)
  }

  return (
    <PortalToFollowElem
      open={open}
      onOpenChange={setOpen}
      placement='top-start'
    >
      <PortalToFollowElemTrigger onClick={handleToggle}>
        <div className={`
          relative flex h-9 items-center justify-center rounded-sm border border-sand bg-cream-base px-3 text-xs font-semibold text-forest-dark
          transition-colors duration-200 hover:border-forest-medium hover:bg-cream-light
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        `}>
          <Link03 className='mr-2 w-4 h-4' />
          {t('common.imageUploader.pasteImageLink')}
        </div>
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent className='z-10'>
        <div className='w-[320px] rounded-md border border-sand bg-cream-light p-2 shadow-woodcut'>
          <ImageLinkInput onUpload={handleUpload} />
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  )
}

type TextGenerationImageUploaderProps = {
  settings: VisionSettings
  onFilesChange: (files: ImageFile[]) => void
}
const TextGenerationImageUploader: FC<TextGenerationImageUploaderProps> = ({
  settings,
  onFilesChange,
}) => {
  const { t } = useTranslation()

  const {
    files,
    onUpload,
    onRemove,
    onImageLinkLoadError,
    onImageLinkLoadSuccess,
    onReUpload,
  } = useImageFiles()

  useEffect(() => {
    onFilesChange(files)
  }, [files])

  const localUpload = (
    <Uploader
      onUpload={onUpload}
      disabled={files.length >= settings.number_limits}
      limit={+settings.image_file_size_limit!}
    >
      {
        hovering => (
          <div className={`
            flex h-9 items-center justify-center rounded-sm border border-sand bg-cream-base px-3
            text-xs font-semibold text-forest-dark transition-colors duration-200
            ${hovering ? 'border-forest-medium bg-cream-light' : ''}
            ${files.length >= settings.number_limits ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          `}>
            <ImagePlus className='mr-2 w-4 h-4' />
            {t('common.imageUploader.uploadFromComputer')}
          </div>
        )
      }
    </Uploader>
  )

  const urlUpload = (
    <PasteImageLinkButton
      onUpload={onUpload}
      disabled={files.length >= settings.number_limits}
    />
  )

  return (
    <div>
      <div className='mb-2'>
        <ImageList
          list={files}
          onRemove={onRemove}
          onReUpload={onReUpload}
          onImageLinkLoadError={onImageLinkLoadError}
          onImageLinkLoadSuccess={onImageLinkLoadSuccess}
        />
      </div>
      <div className={`grid gap-2 ${settings.transfer_methods.length === 2 ? 'grid-cols-1 pc:grid-cols-2' : 'grid-cols-1'}`}>
        {
          settings.transfer_methods.map((method) => {
            if (method === TransferMethod.local_file)
              return <Fragment key={TransferMethod.local_file}>{localUpload}</Fragment>

            if (method === TransferMethod.remote_url)
              return <Fragment key={TransferMethod.remote_url}>{urlUpload}</Fragment>

            return null
          })
        }
      </div>
    </div>
  )
}

export default TextGenerationImageUploader
