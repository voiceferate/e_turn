import { ElementRef } from '@angular/core'

declare var M

export interface MaterialInstance {
  date?: Date
  setDate?(arg0: Date)
  open?(): void,
  close?(number?): void,
  destroy?(): void
  el: any
}

export class MaterialServise {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }

  static initSidenav(ref: ElementRef,options: object): MaterialInstance {
    return M.Sidenav.init(ref.nativeElement, options)
  }

  static initDatePicker(ref: ElementRef, options: object): MaterialInstance {
    return M.Datepicker.init(ref.nativeElement, options)
  }

  static initFormSelect(ref: ElementRef, options: object): MaterialInstance {
    return M.FormSelect.init(ref.nativeElement, options)
  }

  static updateTextInputs(): MaterialInstance {
    return M.updateTextFields()
  }

  static initCollapsible(ref: ElementRef, options: object): MaterialInstance {
    return M.Collapsible.init(ref.nativeElement, options)
  }

  static initHelperText(ref: ElementRef, options: object): MaterialInstance {
    return M.TapTarget.init(ref.nativeElement, options)
  }
  
} 