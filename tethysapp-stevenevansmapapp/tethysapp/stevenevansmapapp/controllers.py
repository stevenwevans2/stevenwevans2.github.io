from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from tethys_sdk.gizmos import Button

@login_required()
def home(request):
    """
    Controller for the app home page.
    """
    save_button = Button(
        display_text='',
        name='save-button',
        icon='glyphicon glyphicon-floppy-disk',
        style='success',
        attributes={
            'data-toggle':'tooltip',
            'data-placement':'top',
            'title':'Save'
        }
    )

    edit_button = Button(
        display_text='',
        name='edit-button',
        icon='glyphicon glyphicon-edit',
        style='warning',
        attributes={
            'data-toggle':'tooltip',
            'data-placement':'top',
            'title':'Edit'
        }
    )

    remove_button = Button(
        display_text='',
        name='remove-button',
        icon='glyphicon glyphicon-remove',
        style='danger',
        attributes={
            'data-toggle':'tooltip',
            'data-placement':'top',
            'title':'Remove'
        }
    )

    previous_button = Button(
        display_text='Previous',
        name='previous-button',
        attributes={
            'data-toggle':'tooltip',
            'data-placement':'top',
            'title':'Previous'
        }
    )

    next_button = Button(
        display_text='Next',
        name='next-button',
        attributes={
            'data-toggle':'tooltip',
            'data-placement':'top',
            'title':'Next'
        }
    )

    context = {
        'save_button': save_button,
        'edit_button': edit_button,
        'remove_button': remove_button,
        'previous_button': previous_button,
        'next_button': next_button
    }

    return render(request, 'stevenevansmapapp/home.html', context)
@login_required()
def map_view(request):
    """
    Controller for the app home page.
    """
    context={}
    return render(request, 'stevenevansmapapp/map-view.html', context)

@login_required()
def data_services(request):
    """
    Controller for the data services page.
    """
    context={}
    return render(request, 'stevenevansmapapp/data-services.html', context)

@login_required()
def about(request):
    """
    Controller for the about page.
    """
    context={}
    return render(request, 'stevenevansmapapp/about.html', context)
@login_required()
def proposal(request):
    """
    Controller for the proposal page.
    """
    context={}
    return render(request, 'stevenevansmapapp/proposal.html', context)
@login_required()
def mockups(request):
    """
    Controller for the mockups page.
    """
    context={}
    return render(request, 'stevenevansmapapp/mockups.html', context)