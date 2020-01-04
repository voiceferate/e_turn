import { ElementRef } from '@angular/core'

declare var M

export interface MaterialInstance {
  open?(): void,
  close?(): void,
  destroy?(): void
}

export class MaterialServise {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }

  static datePicker(ref: ElementRef): MaterialInstance {
    return M.Datepicker.init(ref.nativeElement)
  }

  static updateTextInputs(): MaterialInstance {
    return M.updateTextFields()
  }

} 