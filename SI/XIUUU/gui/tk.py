from tkinter import *
class gui:
    def __init__(self, resolution, WindowTitlle):
        self.root = Tk()
        self.root.geometry(resolution)
        self.frame = Frame(self.root)
        self.frame.pack()
        self.entry = Entry(self.frame, width=50)
        self.label = None
        self.btn = None
        self.WindowTitlle = WindowTitlle
        
    
    def open(self, msg, comand):
        try:
            if (comand != None):
                self.btn = Button(self.frame, text="sumit", command=comand)
                self.btn.pack(padx=3, pady=3)
            self.label = Label(self.frame, text = msg, wraplength=400, justify=LEFT)
            self.entry.pack(padx=5, pady=5)
            self.label.pack()    
            self.root.title(self.WindowTitlle)
            self.root.mainloop()
        except:
            print("Err on create gui")    
        
    def setBackgroundColor(self, color):        self.root.configure(background=color)
    def getEntry(self):                         return self.entry
    def getValue(self, entry):                  return entry.get()
